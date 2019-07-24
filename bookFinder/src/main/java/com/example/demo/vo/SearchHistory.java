package com.example.demo.vo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SearchHistory {
	@Id
	@GeneratedValue
	int id;

	private String searchVal;
	private String searchPart;
	private String cnt;
	private LocalDateTime createdTimeAt;
	
	
	
	/**
	 * searchPart
	 */
	private String query;
	private String target;
	private String page;
	private String size;

	
	
	
	
    public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}


	public String getCnt() {
		return cnt;
	}

	public void setCnt(String cnt) {
		this.cnt = cnt;
	}

	
    
    public SearchHistory() {
        createdTimeAt = LocalDateTime.now();
    }
    
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	public String getSearchPart() {
		return searchPart;
	}

	public void setSearchPart(String searchPart) {
		this.searchPart = searchPart;
	}

	public LocalDateTime getCreatedTimeAt() {
		return createdTimeAt;
	}

	public void setCreatedTimeAt(LocalDateTime createdTimeAt) {
		this.createdTimeAt = createdTimeAt;
	}

	public String getSearchVal() {
		return searchVal;
	}

	public void setSearchVal(String searchVal) {
		this.searchVal = searchVal;
	}


	
	
	
	
	
	
	
}