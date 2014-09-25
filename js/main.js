var DIRECTION = {
    "north" : [0, '^'],
    "west" : [270, '<'],
    "east" : [90, '>'],
    "south" : [180, 'v']
};


$(function(){
    
    $.fn.CreateViewPort = function(width, height){
        $currentElement = $(this);
        
        for(i=width-1;i>=0;i--){
            for(j=0;j<height;j++){
                $currentElement.append('<div class="element" data="' + i + ',' + j + '"></div>');
                if(j==height-1)
                    $currentElement.append("<div class='clear-both'></div>");
            }
        }
        
        return [width-1, height-1];
    }
    
    $.fn.PlaceRobot = function(positionX, positionY, direction){
        $currentElement = $(this);
        
        $currentElement.find('.element').each(function(i){
            if($(this).attr("data") == (positionY + "," + positionX)){
                for(x in DIRECTION){
                    if(x == direction){
                        $(this).append("<img src='android_robot.png' alt='robot-png' data='"+ positionX + "," + positionY + "," + direction + "'class='robot " +
                                       direction + "'/> <span>" + DIRECTION[x][1]+ "</span>");
                    }
                }
            }
        });
        
    }
    
    $.fn.Turn = function(direction){
        turnDegree = direction == "left" ? -90 : 90;
        
        var $robot = $(this).find('.robot');
        currentDirection = $robot.attr('class');
        currentDirection = currentDirection.replace("robot ", "");
        
        var newDirectionDegree = DIRECTION[currentDirection][0] + turnDegree;
        newDirectionDegree = newDirectionDegree >= 360 ? newDirectionDegree %360: newDirectionDegree;
        newDirectionDegree = newDirectionDegree < 0 ? 360 + newDirectionDegree : newDirectionDegree;
        console.log(newDirectionDegree);
        var newDirection = currentDirection;
        for(x in DIRECTION){
            if(DIRECTION[x][0] == newDirectionDegree)
                newDirection = x;
        }
        
        $robot.removeClass(currentDirection);
        $robot.addClass(newDirection);
        $robot.parent().find('span').html(DIRECTION[newDirection][1]);
    }
    
    
    $.fn.Move = function(maxViewPort){
        var $robot = $(this).find('.robot');
        currentDirection = $robot.attr('class');
        currentDirection = currentDirection.replace("robot ", "");
        
        currentPosition = $robot.closest('.element').attr("data").split(',');
        currentPosition = [parseInt(currentPosition[0]) ,parseInt(currentPosition[1])];
        console.log(currentPosition);
        console.log(maxViewPort);
        
        if(currentDirection == "west"){
            currentPosition = [currentPosition[0], currentPosition[1] - 1];
        }
        else if(currentDirection == "north"){
            currentPosition = [currentPosition[0] + 1, currentPosition[1]];
        }
        else if(currentDirection == "east"){
            currentPosition = [currentPosition[0], currentPosition[1] + 1];
        }
        else if(currentDirection == "south"){
            currentPosition = [currentPosition[0] - 1, currentPosition[1]];
        }
        else
            console.log("error");
        if((maxViewPort[0] < currentPosition[0] || maxViewPort[1] < currentPosition[1]) || (currentPosition[0] < 0 || currentPosition[1] < 0))
            return;
        $robot.siblings('span').remove();
        $robot.remove();
        
        $(this).PlaceRobot(currentPosition[1], currentPosition[0], currentDirection);
    }
    
    var maxViewPort = $('body .viewport').CreateViewPort(5, 5);

    
    $('.command input').click(function(){
       
       if($(this).hasClass('place')) {
            $('.robot').remove();
            $('.robot').siblings('span').remove();
            var placeCoordinate = prompt("Please Enter Coordinate", "0,0");
            placeCoordinate = placeCoordinate.split(',');
            if(maxViewPort[0] < placeCoordinate[0] || maxViewPort[1] < placeCoordinate[1])
                alert("Please input below MAX Viewport");
                
            $('body .viewport').PlaceRobot(placeCoordinate[0], placeCoordinate[1], 'north');        
       }
       else if($(this).hasClass('right')){
            if($('.robot').length > 0)
                $('body .viewport').Turn('right');
       }
       else if($(this).hasClass('left')){
            if($('.robot').length > 0)
                $('body .viewport').Turn('left');
       }
       else if($(this).hasClass('move')){
            if($('.robot').length > 0)
                $('body .viewport').Move(maxViewPort);
       }
       
       $(this).siblings('.coordinate-now').find('h2').html($('.robot').attr('data'));
    });
    
    
    
});