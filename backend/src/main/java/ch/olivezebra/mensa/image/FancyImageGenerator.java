package ch.olivezebra.mensa.image;

import ch.olivezebra.mensa.database.table.Table;
import ch.olivezebra.mensa.microservices.MapGen;
import com.github.weisj.jsvg.SVGDocument;
import com.github.weisj.jsvg.SVGRenderingHints;
import com.github.weisj.jsvg.geometry.size.FloatSize;
import com.github.weisj.jsvg.parser.SVGLoader;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import net.glxn.qrgen.javase.QRCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class FancyImageGenerator {

    @Value("${frontend.qr}")
    String url;

    private final MapGen mapGen;

    /**
     * Needs JetBrains Mono installed lol
     * @param table
     * @return
     */
    @SneakyThrows
    public BufferedImage generate(Table table) {
        float padding = 10; // see python

        int total = 512;
        BufferedImage image = new BufferedImage(total, total, BufferedImage.TYPE_INT_ARGB);
        Graphics g = image.getGraphics();

        // set background color
        g.setColor(Color.decode("#EDF1DA"));
        g.fillRect(0, 0, total, total);

        // render svg
        BufferedImage svg = renderSVG(mapGen.getMapPreview(table.getMensa(), table));

        int x = (int) (((table.getCenterX() + padding) / (table.getMensa().getWidth() + padding * 2)) * svg.getWidth());
        int y = (int) (((table.getCenterY() + padding) / (table.getMensa().getHeight() + padding * 2)) * svg.getHeight());

        int radius = 512;
        g.drawImage(svg, 0, 0, total, total, x - radius, y - radius, x + radius, y + radius, null);

        // produce qr code image
        int dim = 320;
        BufferedImage qr = new BufferedImage(dim, dim, BufferedImage.TYPE_INT_ARGB);
        var matrix = QRCode.from("").withSize(dim, dim).createMatrix(url + table.getId().toString());
        for (int i = 0; i < dim; i++) for (int j = 0; j < dim; j++)
                qr.setRGB(i, j, matrix.get(i, j) ? 0xFF000000 : 0x00000000);

        g.drawImage(qr, (total - dim) / 2, (total - dim) / 2 + 20, dim, dim, null);

        // write text
        Graphics2D g2d = (Graphics2D) g;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.setColor(Color.BLACK);
        Font font = new Font("JetBrains Mono", Font.BOLD, 50);
        drawCenteredString(g2d, table.getMensa().getName(), new Rectangle(0, ((total - dim) / 2), total, 50), font);

        Font font2 = new Font("JetBrains Mono", Font.PLAIN, 16);
        String id = Arrays.stream(table.getId().toString().split("-")).toList().getLast();
        drawEndString(g2d, id, new Rectangle(((total - dim) / 2), ((total - dim) / 2) + dim - 20, dim - 45, 10), font2);

        // mask it circular
        for (int i = 0; i < image.getWidth(); i++) for (int j = 0; j < image.getHeight(); j++) {
            int tx = i - total / 2;
            int ty = j - total / 2;
            int td = total / 2;

            if (tx*tx + ty*ty > td * td)
                image.setRGB(i, j, 0x00000000);
        }

        g.dispose();

        return image;
    }

    /**
     * Draw a String centered in the middle of a Rectangle.
     *
     * @param g The Graphics instance.
     * @param text The String to draw.
     * @param rect The Rectangle to center the text in.
     */
    public void drawCenteredString(Graphics g, String text, Rectangle rect, Font font) {
        // Get the FontMetrics
        FontMetrics metrics = g.getFontMetrics(font);
        // Determine the X coordinate for the text
        int x = rect.x + (rect.width - metrics.stringWidth(text)) / 2;
        // Determine the Y coordinate for the text (note we add the ascent, as in java 2d 0 is top of the screen)
        int y = rect.y + ((rect.height - metrics.getHeight()) / 2) + metrics.getAscent();
        // Set the font
        g.setFont(font);
        // Draw the String
        g.drawString(text, x, y);
    }

    public void drawEndString(Graphics g, String text, Rectangle rect, Font font) {
        // Get the FontMetrics
        FontMetrics metrics = g.getFontMetrics(font);
        // Determine the X coordinate for the text
        int x = (int) (rect.x + rect.getWidth() - metrics.stringWidth(text));
        // Determine the Y coordinate for the text (note we add the ascent, as in java 2d 0 is top of the screen)
        int y = rect.y + ((rect.height - metrics.getHeight()) / 2) + metrics.getAscent();
        // Set the font
        g.setFont(font);
        // Draw the String
        g.drawString(text, x, y);
    }

    private BufferedImage renderSVG(String source) {
        InputStream stream = new ByteArrayInputStream(source.getBytes(StandardCharsets.UTF_8));
        SVGDocument svgDocument = new SVGLoader().load(stream);

        FloatSize size = svgDocument.size();
        BufferedImage image = new BufferedImage((int) size.width,(int) size.height, BufferedImage.TYPE_INT_ARGB);

        Graphics2D g = image.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
        g.setRenderingHint(SVGRenderingHints.KEY_SOFT_CLIPPING, SVGRenderingHints.VALUE_SOFT_CLIPPING_ON);
        g.setRenderingHint(SVGRenderingHints.KEY_IMAGE_ANTIALIASING, SVGRenderingHints.VALUE_IMAGE_ANTIALIASING_ON);

        svgDocument.render(null,g);
        g.dispose();

        return image;
    }


}
