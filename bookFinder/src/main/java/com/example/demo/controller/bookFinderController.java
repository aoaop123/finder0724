package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.SearchHistoryDao;
import com.example.demo.vo.SearchHistory;


@Controller
public class bookFinderController {

	@Autowired
	private SearchHistoryDao searchDao;

	final String cacaoAuth = "KakaoAK fccf31f2eda13ac59024e683bfc3534c";
	final String cacaoUrl = "https://dapi.kakao.com/v3/search/book";
	
    final String naverClientId = "YuecT3NBquPOJiefKIMM";
    final String naverClientSecret = "2kvyxYZyeP";
    final String naverUrl="https://openapi.naver.com/v1/search/book_adv.json";
	
	
	@RequestMapping("/searchBookList")
	@ResponseBody
	public Map<String,Object> searchBookList(SearchHistory paramVO) {
		

		
		Map<String,Object> returnMap = new HashMap<String, Object>();
		
		try {

	        String body = "";
	             
	             
	        StringBuffer apiURL = new StringBuffer();
	        apiURL.append(cacaoUrl);
	        apiURL.append("?query="+URLEncoder.encode(paramVO.getQuery(),"UTF-8"));
	        apiURL.append("&target="+paramVO.getTarget());
	        apiURL.append("&page="+paramVO.getPage());
	        apiURL.append("&size="+paramVO.getSize());
	        apiURL.append("&sort=latest");
	        
	             	        	
            URL url = new URL(apiURL.toString());
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", cacaoAuth);
            con.setRequestProperty("Content-Type", "application/json");

            

            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(body);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
            	
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
            } else {  // 에러 발생
            	
            	throw new Exception();
            	
                
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            
            
            
            SearchHistory insertVO = new SearchHistory();
            insertVO.setSearchVal(paramVO.getQuery());
            insertVO.setSearchPart(paramVO.getTarget());
            searchDao.save(insertVO);
            
            
            returnMap.put("returnList", response);
            
            
            return returnMap;
            
            
		}catch(Exception e) {
			
			 returnMap.put("returnList", searchBookListByNaver(paramVO));
			
			return returnMap;
		}

		
	}
	
	private StringBuffer searchBookListByNaver(SearchHistory paramVO) {
		StringBuffer response = new StringBuffer();

        try {
            
	        StringBuffer apiURL = new StringBuffer();
	        apiURL.append(naverUrl);
	        
	        if("title".equals(paramVO.getTarget())) {
	        	apiURL.append("?d_titl="+URLEncoder.encode(paramVO.getQuery(),"UTF-8"));	
	        }else if("publisher".equals(paramVO.getTarget())) {
	        	apiURL.append("?d_publ="+URLEncoder.encode(paramVO.getQuery(),"UTF-8"));	
	        }else if("isbn".equals(paramVO.getTarget())) {
	        	apiURL.append("?d_isbn="+URLEncoder.encode(paramVO.getQuery(),"UTF-8"));	
	        }else if("person".equals(paramVO.getTarget())) {
	        	apiURL.append("?d_auth="+URLEncoder.encode(paramVO.getQuery(),"UTF-8"));	
	        }else if("".equals(paramVO.getTarget())) {
	        	apiURL.append("?d_titl="+URLEncoder.encode(paramVO.getQuery(),"UTF-8"));	
	        }
	        if(paramVO.getPage()!=null && !"".contentEquals(paramVO.getPage())) {
	        	apiURL.append("&start="+paramVO.getPage());
	        }
	        if(paramVO.getSize()!=null && !"".contentEquals(paramVO.getSize())) {
	        	apiURL.append("&display="+paramVO.getSize());
	        }
	        apiURL.append("&sort=date");
	        
	         

	        URL url = new URL(apiURL.toString()); 
	        
            URLConnection urlConn=url.openConnection(); 
            
            urlConn.setRequestProperty("X-Naver-Client-ID", naverClientId);
            urlConn.setRequestProperty("X-Naver-Client-Secret", naverClientSecret);
            
            BufferedReader br = new BufferedReader(new InputStreamReader(urlConn.getInputStream(), "UTF-8"));
            
            String inputLine;
            
            while((inputLine = br.readLine())!=null)
            {
            	
            	response.append(inputLine.replace("\"items\"", "\"documents\"")
            			.replace("\"author\"", "\"authors\"")
            			.replace("\"discount\"", "\"sale_price\"")
            			.replace("\"pubdate\"", "\"datetime\"")
            			.replace("\"description\"", "\"contents\"")
            			.replace("\"image\"", "\"thumbnail\"")
            			
            			);
            }

        } catch (Exception e) {
           e.printStackTrace();
        }
		
		return response;
		
	}
	
	
	
	
	@RequestMapping("/searchHistoryAndBest")
	@ResponseBody
	public Map<String,Object> searchHistoryAndBest(SearchHistory hvo) {

		Map<String,Object> returnMap = new HashMap<String, Object>();
		
		try {
			
			
			List<SearchHistory> resultList = searchDao.findTop3ByOrderByCreatedTimeAtDesc();
			List<SearchHistory> bestHitsList = searchDao.getBestList(); 
			
			returnMap.put("resultList", resultList);
			returnMap.put("bestHitsList", bestHitsList);
			returnMap.put("returnMsg", "succ");
			
		}catch(Exception e) {
			e.printStackTrace();
			returnMap.put("returnMsg", "fail");
		}

		return returnMap;
	}
	

	
	
}
