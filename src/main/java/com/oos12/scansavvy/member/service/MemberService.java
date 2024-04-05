package com.oos12.scansavvy.member.service;

import com.oos12.scansavvy.member.model.Member;

import java.util.List;

public interface MemberService {
    List<Member> findAll();
    Member findByEmail(String email);
    Member findByPhone(String phone);
    List<Member> findAllByOrderByNameDesc();
    Member saveOrUpdateMember(Member member);
    void deleteMemberById(String id);
}
