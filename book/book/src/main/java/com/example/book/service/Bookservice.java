// package com.example.book.service;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.book.model.Book;
// import com.example.book.repository.Bookrepo;

// @Service
// public class Bookservice {

// @Autowired
// private Bookrepo dRepository;

// public Book findByUsername(String username) {
// return dRepository.findByUsername(username);
// }

// public List<Book> findAll() {
// return dRepository.findAll();
// }

// public Book save(Book dModel) {
// return dRepository.save(dModel);
// }

// public Book updateUser(String username, Book updatedModel) {
// Book existingUser = dRepository.findByUsername(username);
// if (existingUser != null) {
// existingUser.setUsername(updatedModel.getUsername());
// existingUser.setEmail(updatedModel.getEmail());
// existingUser.setPassword(updatedModel.getPassword());
// existingUser.setPhonenumber(updatedModel.getPhonenumber());
// return dRepository.save(existingUser);
// } else {
// throw new RuntimeException("User not found");
// }
// }

// public void deleteByUsername(String username) {
// Book existingUser = dRepository.findByUsername(username);
// if (existingUser != null) {
// dRepository.delete(existingUser);
// } else {
// throw new RuntimeException("User not found");
// }
// }
// }
