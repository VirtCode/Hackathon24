package ch.olivezebra.mensa;

import ch.olivezebra.mensa.auth.OAuthInterceptor;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import io.swagger.v3.core.jackson.ModelResolver;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.core.Ordered;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.*;

import java.util.List;

@EnableWebMvc
@Configuration
@OpenAPIDefinition(info = @Info(title = "mensa", version = "v2"))
@PropertySource("classpath:version.properties") // generated at build time
public class Config implements WebMvcConfigurer {

    static {
        // fix swagger enums (https://github.com/springdoc/springdoc-openapi/issues/232#issuecomment-748607672)
        ModelResolver.enumsAsRef = true;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        WebMvcConfigurer.super.configureMessageConverters(converters);
        converters.add(new ByteArrayHttpMessageConverter());
        converters.add(new MappingJackson2HttpMessageConverter(
                new ObjectMapper()
                        .setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
                        .registerModule(new Hibernate6Module().configure(Hibernate6Module.Feature.FORCE_LAZY_LOADING, true)) // load and serialize lazy proxies
        ));
        converters.add(new ResourceHttpMessageConverter());
        converters.add(new StringHttpMessageConverter());
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        WebMvcConfigurer.super.configurePathMatch(configurer);
        configurer.setUseTrailingSlashMatch(true);
    }

    @Bean
    public OAuthInterceptor createAuthInterceptor() {
        return new OAuthInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        WebMvcConfigurer.super.addInterceptors(registry);
        registry.addInterceptor(createAuthInterceptor()).order(Ordered.LOWEST_PRECEDENCE);
    }
}
