package com.example.demo.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.MemberDao;
import com.example.demo.vo.Member;


@Controller
public class loginController {

	@Autowired
	private MemberDao memberDao;


	 
	@RequestMapping(value = "/" , method=RequestMethod.GET)
	public String main() { // jsp 페이지 호출 
		return "login"; 
	}
	
		
	@RequestMapping("/join")
	@ResponseBody
	public String add(Member mvo) {

		try {
			mvo.setUserPw(encSHA256(mvo.getUserPw()));
			memberDao.save(mvo);
			 

		}catch(Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return "succ";
	}
	
	@RequestMapping("/checkUserId")
	@ResponseBody
	public String checkUserId(Member mvo) {

		String returnVal = "0";
		try {
			List<Member> returnList = memberDao.findByUserId(mvo.getUserId());
			returnVal = Integer.toString(returnList.size());
			
		}catch(Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return returnVal;
	}
	@RequestMapping("/login")
	@ResponseBody
	public String login(Member mvo, HttpServletRequest request) {

		String returnVal = "";
		try {
			mvo.setUserPw(encSHA256(mvo.getUserPw()));
			List<Member> returnList = memberDao.findByUserIdAndPassWord(mvo.getUserId(),mvo.getUserPw());

			if(returnList.size()==0) {
				returnVal =  "checkIdPw";
			}else{
				returnVal =   "welCome";
			}
			
		}catch(Exception e) {
			e.printStackTrace();
			return "fail";
		}

		return returnVal;
	}
	

	
	
	private String encSHA256(String pw) {
		StringBuffer buf = new StringBuffer();
		
		MessageDigest mDigest;
		
		try {
			mDigest = MessageDigest.getInstance("SHA-256");
			mDigest.update(pw.getBytes());
			
			byte[] msgStr = mDigest.digest();
			for(int i=0;i<msgStr.length;i++) {
				byte tmpStrByte = msgStr[i];
				String tmpEncTxt = Integer.toString((tmpStrByte & 0xff) + 0x100 ,16).substring(1);
				buf.append(tmpEncTxt);
			}
			
			
		}catch(NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return buf.toString();
		
	}
}
