package com.example.demo.service;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.vo.SearchHistory;

public interface SearchHistoryDao extends JpaRepository <SearchHistory, Integer> {
	

	public List<SearchHistory> findTop3ByOrderByCreatedTimeAtDesc();
	  
	public List<SearchHistory> getBestList();
	
} 