package rs.ac.bg.fon.social_network.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.social_network.domain.User;
import rs.ac.bg.fon.social_network.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public Page<User> getAll(Pageable pageable) {
        return userService.getAll(pageable);
    }

    @GetMapping("/currentlyLoggedIn")
    public User getCurrentlyLoggedInUser() {
        return userService.getCurrentlyLoggedInUser();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @GetMapping("/username/{username}")
    public Page<User> findByUsername(@PathVariable String username, Pageable pageable) {
        return userService.findByUsername(username, pageable);
    }

    @GetMapping("/followers")
    public Page<User> getFollowers(Pageable pageable) {
        return userService.getFollowers(pageable);
    }

    @GetMapping("/following")
    public Page<User> getFollowing(Pageable pageable) {
        return userService.getFollowing(pageable);
    }

    @PostMapping("/follow/{followingUserId}")
    public void followAnotherUser(@PathVariable Long followingUserId) {
        userService.followAnotherUser(followingUserId);
    }

    @DeleteMapping("/unfollow/{userIdToUnfollow}")
    public void unfollowAnotherUser(@PathVariable Long userIdToUnfollow) {
        userService.unfollow(userIdToUnfollow);
    }

    @GetMapping("/isFollowing/{userId}")
    public boolean isFollowing(@PathVariable Long userId) {
        return userService.isFollowing(userId);
    }
}
