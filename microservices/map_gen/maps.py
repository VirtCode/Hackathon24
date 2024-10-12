import svg
import json
import logging
import copy

class Map():
    def __init__(self, path) -> None:
        self.size_x = 2048
        self.size_y = 2048
        
        try:
            with open(path, 'r') as file:
                data = json.load(file)

            self.inner_x = data['innerX']
            self.inner_y = data['innerY']
            self.inner_width = data['innerWidth']
            self.inner_height = data['innerHeight']

            self.svgMap = svg.SVG(viewBox=f'0 0 {self.size_x} {self.size_y}', elements=[])
        
            for element in data['floor'][0]['objects']:
                if (element['type'] == 1): # RECT
                    self.svgMap.elements.append(self.createRect(
                        className=element['class'],
                        start_x=element['x'],
                        start_y=element['y'],
                        width=element['width'],
                        height=element['height'],
                        fill_color=element['fill_color'],
                        opacity=element['fill_opacity'],
                        stroke_color=element['stroke_color'],
                        stroke_width=element['stroke_width'],
                    ))
        except:
            logging.error(f'No file with name: {path} found!')
        
    def createRect(self, className, start_x, start_y, width, height, fill_color, opacity, stroke_color = "BLACK", stroke_width = 0):
       return svg.Rect(class_=className, x=start_x, y=start_y, width=width, height=height, fill=fill_color, fill_opacity=opacity, stroke=stroke_color, stroke_width=stroke_width)

def calcTableX(relTableX, tableAreaWidth, innerX, innerWidth):
    return innerX + (innerWidth / tableAreaWidth) * relTableX

def calcTableY(relTableY, tableAreaHeight, innerY, innerHeight):
    return calcTableX(relTableY, tableAreaHeight, innerY, innerHeight)

def calcTableWidth(relTableWidth, tableAreaWidth, innerWidth):
    return (innerWidth / tableAreaWidth) * relTableWidth

def calcTableHeight(relTableHeight, tableAreaHeight, innerHeight):
    return calcTableWidth(relTableHeight, tableAreaHeight, innerHeight)

def addTables(myMap, jsonData):

    table_start_x = jsonData['x']
    table_start_y = jsonData['y']
    table_area_width = jsonData['width']
    table_area_height = jsonData['height']
    tables_data = jsonData['tables']

    for entry in tables_data:

        table = svg.Rect(
            id = entry['id'],
            x = calcTableX(entry['x'], table_area_width, myMap.inner_x, myMap.inner_width),
            y = calcTableY(entry['y'], table_area_height, myMap.inner_y, myMap.inner_height),
            width=calcTableWidth(entry['width'], table_area_width, myMap.inner_width),
            height=calcTableHeight(entry['height'], table_area_height, myMap.inner_height),
            fill="ORANGE",
            class_="TABLE"
        )

        myMap.svgMap.elements.append(table)
    
    return myMap






    
    

