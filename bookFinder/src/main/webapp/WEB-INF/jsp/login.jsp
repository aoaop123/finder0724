<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="UTF-8"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html> 
<html lang="en">

<head>
  <c:set var="context" value="${pageContext.request.contextPath}" />

  <title>BOOK FINDER</title>

  <!-- Bootstrap core CSS -->
  <link href="${context}/resources/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom fonts for this template -->
  <link href="${context}/resources/vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="${context}/resources/vendor/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

  <!-- Custom styles for this template -->
  <link href="${context}/resources/css/landing-page.min.css" rel="stylesheet">
  
  
  <!-- logic js-->
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="${context}/resources/js/login.js"></script>
  
  
  
  
</head>

<body class="text-center">>

  <!-- Navigation -->
    <header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="#">Book finder</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto"></ul>
      <div class="form-inline mt-2 mt-md-0">
        <input class="form-control mr-sm-2" type="text" placeholder="ID" aria-label="ID" id="loginId">
        <input class="form-control mr-sm-2" type="password" placeholder="PASSWORD" aria-label="PASSWORD"  id="loginPw">
        <button class="btn btn-outline-success my-2 my-sm-0" role="button" id="logInBt">Log In</button>
        <div id="loginUser"></div>
      </div>
    </div>
    
  </nav>

</header>

<main role="main">


  <div class="jumbotron" id="welcome">
    <div class="container">
      <h1 class="display-3">Welcome,Please sign-in.</h1>
      <p><a class="btn btn-primary btn-lg" href="#" role="button" id="joinViewBt">Go To Join Page.</a></p>
    </div>
  </div>
  
  
  
  <div  class="jumbotron" id="joinView">
    <div class="container">
      <input type="text" id="userId" placeholder="ID"><div id="idResult"></div><br>
      <input type="password" id="userPw" placeholder="PASSWORD"><div></div>
      <br><br>
      <p><a class="btn btn-primary btn-lg" href="#" role="button" id="joinBt">Join</a></p>
    </div>
  </div>  
  
   <div class="jumbotron" id="bookSearchBar" style="align-content: center;">



	      
	
	      
	          <div class="row">
			      <h4 class="mb-5"></h4>
				      <div class="col-md-2">
				      </div>
			          <div class="col-md-2">
						<select class="form-control" id="searchPart">
						  <option value="title">책제목</option>
						  <option value="publisher">출판사</option>
						  <option value="isbn">ISBN</option>
						  <option value="person">작가</option>
						</select>
			          </div>
			          <div class="col-md-4">
	      				<input type="text" class="form-control mr-sm" id="bookTitle" placeholder="Search Book">
	      				<div id="searchHistory"></div>		
			          </div>
			          <div class="col-md-2">
	      					<a class="btn btn-primary btn-lg" href="#" role="button" id="searchBookBt">Search</a>
			          </div>
			          <div class="col-md-2">
	      					인기 키워드 목록
	      			  
						<select class="form-control" id="bestPart">
						  <option value="title">책제목</option>
						  <option value="publisher">출판사</option>
						  <option value="isbn">ISBN</option>
						  <option value="person">작가</option>
						</select>
			          
	      					<ol id="bestHitsAuthor">
							</ol>
							<ol id="bestHitsTitle">
							</ol>
							<ol id="bestHitsIsbn">
							</ol>
							<ol id="bestHitsPublisher">
							</ol>				
			          </div>
			    </div>
    </div>
    
    

    
 

  
  <div class="container" id="bookList"></div>
  

<nav aria-label="Page navigation example" id="bookPage">
  <ul class="pagination justify-content-center" id="pageNav"></ul>
  <div id="totalCnt"></div>	
</nav>

  
  <div class="jumbotron" id="bookDetail">
			 <div class="row">
			    <div class="col-md-4 order-md-2 mb-4">
			      <img src="" class="img-responsive" id="bookDetailThumbNail">
			      <div  id="noImage"></div>
			    </div>
			    
			    
			    
			    
			    
			    <div class="col-md-8 order-md-1">
			      <h4 class="mb-3" id="bookDetailTitle"></h4>
			        <div class="row">
			          <div class="col-md-6 mb-3">
			            <label for="bookDetailIsbn"><h6 class="mb-3" >Isbn</h6></label>
			            <div id="bookDetailIsbn"></div>
			          </div>
			          <div class="col-md-6 mb-3">
			            <label for="bookDetailAuthors"><h6 class="mb-3" >저자</h6></label>
			            <div id="bookDetailAuthors"></div>
			          </div>
			        </div>
			
			        <div class="row">
			          <div class="col-md-6 mb-3">
			            <label for="bookDetailPublisher"><h6 class="mb-3" >출판사</h6></label>
			            <div id="bookDetailPublisher"></div>
			          </div>
			          <div class="col-md-6 mb-3">
			            <label for="bookDetailDatetime"><h6 class="mb-3" >출판일</h6></label>
			            <div id="bookDetailDatetime"></div>
			          </div>
			        </div>
			
			        <div class="row">
			          <div class="col-md-6 mb-3">
			            <label for="bookDetailPrice"><h6 class="mb-3" >정가</h6></label>
			            <div id="bookDetailPrice"></div>
			          </div>
			          <div class="col-md-6 mb-3">
			            <label for="bookDetailSale_price"><h6 class="mb-3" >판매가</h6></label>
			            <div id="bookDetailSale_price"></div>
			          </div>
			        </div>
			
			        <div class="mb-3">
			          <label for="bookDetailContents">소개</label>
			          <div id="bookDetailContents"></div>
			        </div>
			
			        <a class="btn btn-primary btn-lg btn-block" role="button" id="goToList">GO TO LIST</a>
			    </div>
			  </div>
  </div>
  

</main>



  <!-- Bootstrap core JavaScript -->
  <script src="${context}/resources/vendor/jquery/jquery.min.js"></script>
  <script src="${context}/resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

</body>

</html>

