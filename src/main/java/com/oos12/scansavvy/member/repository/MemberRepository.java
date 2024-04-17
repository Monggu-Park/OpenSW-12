package com.oos12.scansavvy.member.repository;

import com.oos12.scansavvy.member.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MemberRepository extends MongoRepository<Member, String> {

    Member findByEmail(String email);
    Member findByPhone(String phone);

    List<Member> findAllByOrderByNameDesc();
}
