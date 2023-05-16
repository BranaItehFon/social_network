package rs.ac.bg.fon.social_network.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.social_network.domain.Role;
import rs.ac.bg.fon.social_network.domain.User;
import rs.ac.bg.fon.social_network.repository.UserRepository;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Page<User> getAll(Pageable pageable) {
//        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
//        if(currentlyLoggedInUser.getRole().equals(Role.ADMIN)) {
        return userRepository.findAll(pageable);
//        }
    }

    public User getCurrentlyLoggedInUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public boolean followAnotherUser(Long followingUserId) {
        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
        User followinUser = getById(followingUserId);
        return currentlyLoggedInUser.getFollowing().add(followinUser);
    }

    public boolean unfollow(Long userIdToUnfollow) {
        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
        User userToUnfollow = getById(userIdToUnfollow);
        return currentlyLoggedInUser.getFollowing().remove(userToUnfollow);
    }

    public Page<User> getFollowers(Pageable pageable) {
        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
        if (currentlyLoggedInUser.getRole().equals(Role.ADMIN)) {
            throw new IllegalStateException("You cannot have followers while being authenticated as admin");
        }
        return new PageImpl<>(currentlyLoggedInUser.getFollowers().stream().toList(), pageable, currentlyLoggedInUser.getFollowers().size());
    }

    public Page<User> getFollowing(Pageable pageable) {
        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
        if (currentlyLoggedInUser.getRole().equals(Role.ADMIN)) {
            throw new IllegalStateException("You cannot have followers while being authenticated as admin");
        }
        return new PageImpl<>(currentlyLoggedInUser.getFollowing().stream().toList(), pageable, currentlyLoggedInUser.getFollowing().size());
    }

    public Page<User> findByUsername(String username, Pageable pageable) {
        return userRepository.findByUsernameContainsIgnoreCase(username, pageable);
    }
}