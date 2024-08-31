// package com.example.book.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.book.model.Application;
// import com.example.book.repository.ApplicationRepository;

// @RestController
// @CrossOrigin("http://localhost:3000")
// @RequestMapping("/api/applications")
// public class ApplicationController {

// @Autowired
// private ApplicationRepository applicationRepository;

// @PostMapping
// public Application createApplication(@RequestBody Application application) {
// // Generate a unique ID for the application
// application.setUniqueId(java.util.UUID.randomUUID().toString());
// return applicationRepository.save(application);
// }
// }
