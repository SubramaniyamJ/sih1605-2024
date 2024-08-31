// package com.example.book.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.book.model.Book;
// import com.example.book.service.Bookservice;

// @RestController
// @CrossOrigin("http://localhost:3000")
// @RequestMapping("/api/users")
// public class Bookcontroller {

// @Autowired
// private Bookservice dService;

// @GetMapping("/{username}")
// public Book getUserByUsername(@PathVariable String username) {
// return dService.findByUsername(username);
// }

// @GetMapping
// public List<Book> getAllUsers() {
// return dService.findAll();
// }

// @PostMapping("/register")
// public Book registerUser(@RequestBody Book dModel) {
// return dService.save(dModel);
// }

// @PutMapping("/{username}")
// public Book updateUser(@PathVariable String username, @RequestBody Book
// updatedModel) {
// return dService.updateUser(username, updatedModel);
// }

// @DeleteMapping("/{username}")
// public void deleteUser(@PathVariable String username) {
// dService.deleteByUsername(username);
// }
// }
