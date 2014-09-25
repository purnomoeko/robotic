var NORTH = array(0, '^');
var WEST = array(270, '<');
var EAST = array(90, '>');
var SOUTH = array(90, 'v');

$(function(){
    
    $.fn.CreateViewPort = function(width, height){
        $currentElement = $(this);
        
        for(i=0;i<width;i++){
            for(j=0;j<height;j++){
                $currentElement.append('<div class="element" data="' + i + ',' + j + '"></div>');
                if(j==9)
                    $currentElement.append("<div class='clear-both'></div>");
            }
        }
        
    }
    
    $.fn.PlaceRobot = function(positionX, positionY, direction){
        $currentElement = $(this);
        
        $currentElement.find('.element').each(function(i){
            
        });
    }
    
    
    $('body .viewport').CreateViewPort(5, 5);
});