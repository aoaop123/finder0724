$(document).ready(function() {
	loginJs.initPage();
	loginJs.initEvent();
	bookFinderJs.initEvent();
}); 





var loginJs = {
	
    dupResult : false
    ,initPage : function(){
    	$("#welcome").show();
    	$("#joinView").hide();
    	$("#loginUser").hide();
    	$("#bookSearchBar").hide();
    	$("#bookList").hide();
    	$("#bookDetail").hide();
    	$("#bookPage").hide();
   	 
    	
    }	
    ,initEvent : function(){
    	$("#joinViewBt").on("click", function(e) {
    		loginJs.hideWelcome();
    	
    	});
    	
    	$("#joinBt").on("click", function(e) {
    		loginJs.join();
    	});

    	$("#userId").keyup(function() {
    		loginJs.checkUserId();
    	});
    	$("#logInBt").on("click", function(e) {
    		loginJs.login();
    	});
        $("#loginPw").keydown(function (key) { 
            if (key.keyCode == 13) {  
            	loginJs.login();
            } 
        });

        $("#userPw").keydown(function (key) { 
            if (key.keyCode == 13) {  
            	loginJs.join();
            } 
        });    	
    	
    }
    ,login : function(){
    	
    	var param = {
   			 userId: $("#loginId").val(),
   			 userPw: $("#loginPw").val()
   	    };
   	
   		$.ajax({
   		    url: "/login",
   		    data: param,
   		    type: "POST",
	    	success: function(data){
	    		if(data=="checkIdPw"){
	    			alert("아이디 /비번을 확인하세요.");
	    			return;
	    		}else if(data=="welCome"){
	    			$("#loginUser").text(param.userId+"님 환영합니다.");
	    			bookFinderJs.initBookFinder();
	    			
	    		}
            },
            error: function(e){
                alert(JSON.stringify(e));
            }

   	
   		});
    }

    ,checkUserId : function() {
    	var param = {
			 userId: $("#userId").val()
	    };
	
		$.ajax({
		    url: "/checkUserId",
		    data: param,
		    type: "POST",
		    	success: function(data){
		    		if(data>0){
		    			$('#idResult').text("사용중인 ID 입니다.");	
		    			$("#idResult").css("color","red");
		    			loginJs.dupResult = true;
		    		
		    		}else{
		    			$('#idResult').text("사용가능한 ID입니다.");
		    			$("#idResult").css("color","blue");
		    			loginJs.dupResult = false;
 		    		}
		    		
	            },
	            error: function(eee){
	                alert(JSON.stringify(eee));
	            }
	
		});
    }
    ,showWelcome : function() {
    	$("#welcome").show();
    	$("#joinView").hide();
	}
	,hideWelcome : function() {
	 	$("#userId").val("");
        $("#userPw").val("");
		$("#welcome").hide();
		$("#joinView").show();
		$('#idResult').text("");
	}
	,join : function(){
		
		if($("#userId").val()==""){
			alert("아이디를 입력해주세요.");
			$('#userId').focus();
			return;
		}else if($("#userPw").val()==""){
			alert("패스워드를 입력해주세요.");
			$('#userPw').focus();
			return;
		}
	 	
		
		if(loginJs.dupResult){
			alert("중복된 ID는 사용할 수 없습니다.");
			$('#userId').focus();
			return;
		}
		                
		var param = {
				 	userId: $("#userId").val(),
	                userPw: $("#userPw").val()
	    };

		$.ajax({
		    url: "/join",
		    data: param,
		    type: "POST",
		    	success: function(data){
		    		alert("회원가입 되었습니다.");
		    		loginJs.showWelcome();
	            },
	            error: function(eee){
	                alert(JSON.stringify(eee));
	            }

		});

       

	}
	

};


var bookFinderJs = {
		
		currentPage : 1
		,pageSize : 10
		,currentTotal : 0
		,totalPage : 0
		,initBookFinder : function(){
			$("#welcome").hide();
			$("#joinView").hide();
			$("#loginId").hide();
			$("#loginPw").hide();
			$("#logInBt").hide();
			$("#loginUser").show();
			$("#loginUser").css("color","white");
			$("#bookSearchBar").show();
	    	$("#bookList").show();
	    	
			$("#bestHitsAuthor").hide();
			$("#bestHitsTitle").show();
			$("#bestHitsIsbn").hide();
			$("#bestHitsPublisher").hide();
			
	    	
		}
		,initEvent : function(){
			$("#searchBookBt").on("click", function(e) {
				bookFinderJs.searchBooksBytitle(1);
			});
	    	
	        $("#bookTitle").keydown(function (key) { 
	            if (key.keyCode == 13) {  
	            	bookFinderJs.searchBooksBytitle(1);
	            } 
	        });
	        
	    	$("#goToList").on("click", function(e) {
	    		bookFinderJs.goToList();
	    	});
	    	$("#bestPart").on("change", function(e) {
	    		bookFinderJs.refreshBestDiv();
	    	});
	    	
		}
		,refreshBestDiv : function(){
			var bestPart = $("#bestPart").val();
			
	  		 if(bestPart=="title")		{ 
	 			$("#bestHitsAuthor").hide();
				$("#bestHitsTitle").show();
				$("#bestHitsIsbn").hide();
				$("#bestHitsPublisher").hide();
	  		 }
	    	 if(bestPart=="person")		{ 
		 			$("#bestHitsAuthor").show();
					$("#bestHitsTitle").hide();
					$("#bestHitsIsbn").hide();
					$("#bestHitsPublisher").hide();
	    	 }
	    	 if(bestPart=="isbn")		{  
		 			$("#bestHitsAuthor").hide();
					$("#bestHitsTitle").hide();
					$("#bestHitsIsbn").show();
					$("#bestHitsPublisher").hide();
	    	 }
	    	 if(bestPart=="publisher")	{  
		 			$("#bestHitsAuthor").hide();
					$("#bestHitsTitle").hide();
					$("#bestHitsIsbn").hide();
					$("#bestHitsPublisher").show();
	    	 }  		            
 		            
			
		}
		,goToList : function(){

			$("#bookList").show();
			$("#bookPage").show();
			$("#bookSearchBar").show();
			$("#bookDetail").hide();
			
			$("#bookDetailTitle").text();
			$("#bookDetailIsbn").text();
			$("#bookDetailAuthors").text();
			
			$("#bookDetailPublisher").text();
			$("#bookDetailDatetime").text();
			
			 ;
			$("#bookDetailPrice").text();
			$("#bookDetailSale_price").text();			
			
			$("#bookDetailContents").text();
			
			
			$("#bookDetailThumbNail").attr("src", "/");
			
		}
		,refreshBookList : function(result){
	
			var bookList = result.documents;
			if(bookList.length==0){
				$("#bookPage").hide();
				$("#bookList").text("검색 결과가 없습니다.");  
				return;
			}
			 $("#bookList").empty();  
			 
        	  for(var i=0;i<bookList.length;i++){
        		  var html=""
	        		if(i==0){	  
	        		  html="<div class=\"row mb-3\">"
	        		            +"<div class=\"col-md-3 themed-grid-col\">No.</div>"
	        		            +"<div class=\"col-md-6 themed-grid-col\">TITLE</div>"
	        		            +"<div class=\"col-md-3 themed-grid-col\">AUTHOR</div>"
	        		            +"</div>"
	        		        $("#bookList").append(html);    
	        		}
        		  
  		          var jbSplit = bookList[i].isbn.split(' ');
        		  var tempIsbn01 = "";
        		  var tempIsbn02 = "";
  		          for ( var k in jbSplit ) {
  		        	  if(k!=0){
  		        		tempIsbn02 = jbSplit[k];
  		        	  }
  		          }
  				
  		          html="<div class=\"row mb-3\">"
  		            +"<div class=\"col-md-3 themed-grid-col\">"+(i+1+((bookFinderJs.currentPage-1)*bookFinderJs.pageSize))+"</div>"
  		            +"<div class=\"col-md-6 themed-grid-col\"><a class=\"page-link\" href=\"javascript:viewDetail("+tempIsbn02+");\" tabindex=\"-1\">"+bookList[i].title+"</a></div>"
  		            +"<div class=\"col-md-3 themed-grid-col\">"+bookList[i].authors+"</div>"
  		            +"</div>"
  		        $("#bookList").append(html);    
    	        	  
	          }
        	  
        	  if(result.meta==null || result.meta==""){
        		  bookFinderJs.refreshPageNav(result.total);
        	  }else{
        		  bookFinderJs.refreshPageNav(result.meta.pageable_count);  
        	  }
        	  
        	  
        	  
        	  
		}
		
		,viewDetailInfo : function(isbn){
	      	
	      	   $.ajax({
			   		    url: "/searchBookList",
		      	        data:{
		      	             query	: isbn,
		      	             target	:'isbn'
		      	        },
			   		    type: "POST",
				    	success: function(data){
				    		var returnObj = JSON.parse(data.returnList);
				    		bookFinderJs.viewBookDetail(returnObj.documents);
			            },
			            error: function(e){
			            	alert(JSON.stringify(e));
			            }
			   });
	      	        
	      
		}
		,viewBookDetail : function(bookInfo){
			var bookInfoDetail = bookInfo[0];
			$("#bookList").hide();
			$("#bookPage").hide();
			$("#bookSearchBar").hide();
			$("#bookDetail").show();
			
			//setting detail Info
			
			
			$("#bookDetailTitle").text(bookInfoDetail.title);
			$("#bookDetailIsbn").text(bookInfoDetail.isbn);
			$("#bookDetailAuthors").text(bookInfoDetail.authors);
			
			$("#bookDetailPublisher").text(bookInfoDetail.publisher);
			$("#bookDetailDatetime").text(bookInfoDetail.datetime.substring(0, 10));
			
			 ;
			$("#bookDetailPrice").text(numberWithCommas(bookInfoDetail.price));
			$("#bookDetailSale_price").text(numberWithCommas(bookInfoDetail.sale_price));			
			
			$("#bookDetailContents").text(bookInfoDetail.contents);
			
			
			if(bookInfoDetail.thumbnail.length>0){
				$("#bookDetailThumbNail").show();
				$("#bookDetailThumbNail").attr("src", bookInfoDetail.thumbnail);
				$("#noImage").text("");
			}else{
				$("#bookDetailThumbNail").hide();
				$("#noImage").text("No Image");
			}


			
		}	

		,searchBooksBytitle : function(pageNum){


			if(pageNum<=0){
				return;
			}else if(pageNum == null){
      			pageNum=1;
      			bookFinderJs.currentPage = 1;
      		}else{
      			bookFinderJs.currentPage = pageNum;
      		}
			
			
	    	var param = {
     	             query	: $("#bookTitle").val(),
      	             target	: $("#searchPart").val(),
      	             page	: pageNum,
      	             size	: bookFinderJs.pageSize
		   	};
	    	

		    $.ajax({
		   		    url: "/searchBookList",
		   		    data: param,
		   		    type: "POST",
			    	success: function(data){
			    		
			    		bookFinderJs.refreshBookList(JSON.parse(data.returnList));
	      	        	bookFinderJs.searchHistoryAndBest($("#bookTitle").val(),$("#searchPart").val());
	      	        	
		            },
		            error: function(e){
		            	alert(JSON.stringify(e));
		            }
		   		});
		       
		
      
		}
		,refreshBestHitsList : function(bestHitsList){
			
			$("#bestHitsAuthor").empty();
			$("#bestHitsTitle").empty();
			$("#bestHitsIsbn").empty();
			$("#bestHitsPublisher").empty();
			
			for(var i=0;i<bestHitsList.length;i++){
	    	 var tempSearchVal = bestHitsList[i].searchVal;
	    	 var tempSearchPart = bestHitsList[i].searchPart;
	    	 var tempCnt = bestHitsList[i].cnt;
	    	 

	    	 var visibleSearchVal=tempSearchVal;
	    	 if(is_hangul_char(visibleSearchVal)){
	    		 if(visibleSearchVal.length>5){
	    			 visibleSearchVal = visibleSearchVal.substring(0,5)+"...";
		    	 }	 
	    	 }else{
	    		 if(visibleSearchVal.length>10){
	    			 visibleSearchVal = visibleSearchVal.substring(0,10)+"...";
		    	 }	 	    		 
	    	 }
	    	 
	    	 
	    		 
      		  var html="<li data-toggle='tooltip' title='"+tempSearchVal+"'>"
      			    +visibleSearchVal +"	/	"+tempCnt+"회"
  		            +"</li>"  		            
  			 if(tempSearchPart=="title"){  if($("#bestHitsTitle").children().length<10){ $("#bestHitsTitle").append(html); }}
 	    	 if(tempSearchPart=="person"){  if($("#bestHitsAuthor").children().length<10){ $("#bestHitsAuthor").append(html); } }
 	    	 if(tempSearchPart=="isbn"){  if($("#bestHitsIsbn").children().length<10){ $("#bestHitsIsbn").append(html); }}
 	    	 if(tempSearchPart=="publisher"){  if($("#bestHitsPublisher").children().length<10){ $("#bestHitsPublisher").append(html); } }  		            
  		            
			}
			
			
			
		}
		,refreshFavoriteList : function(favoriteList){
			
			$("#searchHistory").empty(); 
			for(var i=0;i<favoriteList.length;i++){
	    	 var tempSearchVal = favoriteList[i].searchVal;
	    	 var tempSearchPart = favoriteList[i].searchPart;
	    	 var tempCreatedtime = favoriteList[i].createdTimeAt;
	    	 
	    	 var visibleSearchVal = tempSearchVal;
	    	 if(is_hangul_char(visibleSearchVal)){
	    		 if(visibleSearchVal.length>14){
		    		 visibleSearchVal = visibleSearchVal.substring(0,10)+"...";
		    	 }	 
	    	 }else{
	    		 if(visibleSearchVal.length>28){
		    		 visibleSearchVal = visibleSearchVal.substring(0,25)+"...";
		    	 }	 	    		 
	    	 }
	    	 
	    	
      		  var html="<div class=\"row mb-10\">"
      			    +"<div class=\"col-md-5 themed-grid-col\" title='"+tempSearchVal+"'><a href=\"javascript:searchBooksByFavorite('"+tempSearchVal+"','"+tempSearchPart+"');\">"+visibleSearchVal+"</div>"
  		            +"<div class=\"col-md-5 themed-grid-col\">"+tempCreatedtime.substring(0, 10)+" / "+tempCreatedtime.substring(11, 19)+"</a></div>"
  		            +"</div>"
  		        $("#searchHistory").append(html); 
			}
		}
		,searchHistoryAndBest : function(){

		       $.ajax({
		   		    url: "/searchHistoryAndBest",
		   		    type: "POST",
			    	success: function(data){
			    		
			    		bookFinderJs.refreshFavoriteList(data.resultList);
			    		bookFinderJs.refreshBestHitsList(data.bestHitsList);

			    		
			    		
		            },
		            error: function(e){
		            	alert(JSON.stringify(e));
		            }

		   	
		   		});
		}
		,refreshPageNav : function(totalCnt){
			
	    	$("#bookPage").show();
	      	$("#totalCnt").text(totalCnt +" 건");  
	      	bookFinderJs.currentTotal = totalCnt;
	      	$("#pageNav").empty();
	      	var totalPage = Math.ceil(totalCnt/bookFinderJs.pageSize)+1;
	      	bookFinderJs.totalPage = totalPage;
	      	
	
	      	
	      	var currentPage = bookFinderJs.currentPage;
	      	
	      	var startPage = ((currentPage - 1) / 10) * 10 + 1;  // 왜 1 을 더할까요?

	      	var endPage = startPage + 10 - 1;  // 왜 1 을 뺄까요?
	      	
	
	  
	      	if(totalPage<endPage){
	      		endPage = totalPage;
	      	}
	      	
	      	
	      	$("#pageNav").append("<li class=\"page-item disabled\">");
	      	$("#pageNav").append("<a class=\"page-link\" href=\"javascript:refreshPageNavPreBack("+(currentPage-10)+");\" tabindex=\"-1\">Previous</a>");
	      	$("#pageNav").append("</li>");
	      	for(var i=startPage;i<=endPage;i++){
   
	      	 if(currentPage==i){
	        	 $("#pageNav").append("<li class=\"page-item active\"><a class=\"page-link\" href=\"javascript:searchBooks("+(i)+");\">"+(i)+"</a></li>");
	         }else{
	        	 $("#pageNav").append("<li class=\"page-item\"><a class=\"page-link\" href=\"javascript:searchBooks("+(i)+");\">"+(i)+"</a></li>"); 
	         }
			}
	      	
	      	 $("#pageNav").append("<li class=\"page-item\">");
		     $("#pageNav").append("<a class=\"page-link\" href=\"javascript:refreshPageNavPreBack("+(currentPage+10)+");\" >Next</a>");
		     $("#pageNav").append("</li>");

		}
		
}

function numberWithCommas(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

function searchBooksByFavorite(favoriteVal,favoritePart){
	
	$("#bookTitle").val(favoriteVal);
	$("#searchPart").val(favoritePart);
	
	bookFinderJs.searchBooksBytitle();
}

function viewDetail(isbn){

	 bookFinderJs.viewDetailInfo(isbn);
}

function refreshPageNavPreBack(pageNum){

	if(pageNum<=0){pageNum=1}
	
	if(pageNum > bookFinderJs.totalPage){
		pageNum = bookFinderJs.totalPage;
	}
	
	
		bookFinderJs.currentPage = pageNum;
		bookFinderJs.searchBooksBytitle(pageNum);
	
	
}

function searchBooks(pageNum){
	
	bookFinderJs.searchBooksBytitle(pageNum);
}
function is_hangul_char(ch) {
	  c = ch.charCodeAt(0);
	  if( 0x1100<=c && c<=0x11FF ) return true;
	  if( 0x3130<=c && c<=0x318F ) return true;
	  if( 0xAC00<=c && c<=0xD7A3 ) return true;
	  return false;
	}