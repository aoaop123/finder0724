package com.example.demo.service;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.vo.Member;

public interface MemberDao extends JpaRepository <Member, Integer> {
	
	@Query("select u from Member u where u.userId = ?1")
	List<Member> findByUserId(String userId);
	
	@Query("select u from Member u where u.userId = ?1 and u.userPw = ?2")
	List<Member> findByUserIdAndPassWord(String userId,String userPw);
	
} 