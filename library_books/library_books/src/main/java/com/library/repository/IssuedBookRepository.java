package com.library.repository;

import com.library.model.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssuedBookRepository extends JpaRepository<IssuedBook,Long> {
    List<IssuedBook> findByUserId(Long userId);
}
