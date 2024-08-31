// package com.example.book.service;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.book.model.User;
// import com.example.book.repository.UserRepository;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     public User findByUsername(String username) {
//         return userRepository.findByUsername(username);
//     }

//     public List<User> findAll() {
//         return userRepository.findAll();
//     }

//     public User save(User user) {
//         return userRepository.save(user);
//     }

//     public User updateUser(String username, User updatedUser) {
//         User existingUser = userRepository.findByUsername(username);
//         if (existingUser != null) {
//             existingUser.setFirstName(updatedUser.getFirstName());
//             existingUser.setLastName(updatedUser.getLastName());
//             existingUser.setEmail(updatedUser.getEmail());
//             existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
//             existingUser.setPassword(updatedUser.getPassword());
//             existingUser.setTermsAccepted(updatedUser.isTermsAccepted());
//             return userRepository.save(existingUser);
//         } else {
//             throw new RuntimeException("User not found");
//         }
//     }

//     public void deleteByUsername(String username) {
//         User existingUser = userRepository.findByUsername(username);
//         if (existingUser != null) {
//             userRepository.delete(existingUser);
//         } else {
//             throw new RuntimeException("User not found");
//         }
//     }
// }

package com.example.book.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.book.model.User;
import com.example.book.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String username, User updatedUser) {
        User existingUser = userRepository.findByUsername(username);
        if (existingUser != null) {
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setTermsAccepted(updatedUser.isTermsAccepted());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteByUsername(String username) {
        User existingUser = userRepository.findByUsername(username);
        if (existingUser != null) {
            userRepository.delete(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
