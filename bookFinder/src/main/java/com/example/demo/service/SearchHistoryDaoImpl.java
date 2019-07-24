package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.example.demo.vo.SearchHistory;

@Transactional
public class SearchHistoryDaoImpl {

	  public List<SearchHistory> getBestList() {
		  List<SearchHistory> returnList = new ArrayList<SearchHistory>(); 
		  
		    List l = em.createQuery(
		        "SELECT d.searchVal,d.searchPart, COUNT(*) AS CNT FROM SearchHistory d " +
		            "GROUP BY d.searchPart,d.searchVal ORDER BY CNT DESC ")
		        .getResultList();
		    for (Object p : l) {
		    	
		    	SearchHistory searchHistoryVO = changeObjectToVO(p);
		    	returnList.add(searchHistoryVO);
		    	
		    }
		   return returnList;
		   
	  }

	  private SearchHistory changeObjectToVO(Object result) {
		  if (result != null && result instanceof Object[]) {
			  Object[] row = (Object[]) result;
			  SearchHistory svo = new SearchHistory();
			  
		      for (int i = 0; i < row.length; i++) {
		    	  switch(i) {
		    	  	case 0:{svo.setSearchVal(row[i].toString());}break;
		    	  	case 1:{svo.setSearchPart(row[i].toString());}break;
		    	  	case 2:{svo.setCnt(row[i].toString());}break;
		    	  
		    	  }
			  }
		      
		      return svo;
		  }else {
			  return null;
		  }
	  }

		  @PersistenceContext
		  private EntityManager em;

}
