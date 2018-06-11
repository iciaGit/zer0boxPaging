
    $.fn.zer0boxPaging = function( opt ) {

        var option = $.extend({"default":"none"}, opt );//외부로 부터 받아올 옵션
        var content = "";
        //li 태그의 스타일  
        var liCss = {
            "display":"inline",
            "border" : "1px solid gray",
            "padding" : "5px 10px",
            "margin" : "0 3px",
            "font-weight" : 600,
            "color":"dodgerblue",
            "cursor":"pointer"            
        };

        this.empty();//한번 지우고

        var start = 1;
        var end = 5;  
        //최초 리스트 생성
        this.append("<ul id='pagingList' style='list-style:none; margin:10px'><li page='#'>Prev</li></ul>");
        
        //이전 페이지가 있을 경우 속성 추가
        if(option.currPage > option.viewRange){          	
			end = Math.ceil(option.currPage/option.viewRange)*option.viewRange;
            start = end-(option.viewRange-1);      
            $("#pagingList li").first().attr("page", start-1);
        }
        
		//페이징 본문
        for(var i = start; i<=end;i++){
            if(i <= option.maxPage){
                if(option.currPage == i){
                    content +="<li style='background-color:lightgray'>"+i+"</li>";
                }else{
                    content +="<li page='"+i+"'>"+i+"</li>";
                }
    
            }
        }

        //다음 페이지 추가
        content +="<li page='#'>Next</li>";
        $("#pagingList").append(content);

        //다음 페이지가 있을 경우 속성 추가
        if(end < option.maxPage){
            $("#pagingList li").last().attr("page", end+1);
        }            
        
        var li = this.find("li");
        var clickPage = 0;     


        //이벤트 추가
        li.on("click",option.clickAction);
        
        //마우스 오버 추가
        li.hover(function(){
            $(this).css("border-color","red");
        },function(){
            $(this).css("border-color","gray");
        });
        //스타일 적용
        li.css(liCss);
        //prev 나 next 의 page 속성이 # 일경우...
        $("#pagingList").find("li[page='#']").each(function(){
            $(this).css("color","gray");
            $(this).css("cursor","default");
        });
    };