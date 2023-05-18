package rs.ac.bg.fon.social_network.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.social_network.domain.Notification;
import rs.ac.bg.fon.social_network.domain.Role;
import rs.ac.bg.fon.social_network.domain.User;
import rs.ac.bg.fon.social_network.repository.NotificationRepository;
import rs.ac.bg.fon.social_network.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getCurrentlyLoggedInUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public void followAnotherUser(Long followingUserId) {
        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
        User followingUser = getById(followingUserId);
        currentlyLoggedInUser.getFollowing().add(followingUser);
        followingUser.getFollowers().add(currentlyLoggedInUser);
        userRepository.save(currentlyLoggedInUser);
        userRepository.save(followingUser);

        Notification notification = Notification.builder()
                .content(currentlyLoggedInUser.getUsername() + " has followed " + followingUser.getUsername())
                .subscriber(followingUser)
                .publisher(currentlyLoggedInUser)
                .timestamp(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
    }

    public void unfollow(Long userIdToUnfollow) {
        User currentlyLoggedInUser = getCurrentlyLoggedInUser();
        User userToUnfollow = getById(userIdToUnfollow);
        currentlyLoggedInUser.getFollowing().remove(userToUnfollow);
        userToUnfollow.getFollowers().remove(currentlyLoggedInUser);
        userRepository.save(currentlyLoggedInUser);
        userRepository.save(userToUnfollow);

        Notification notification = Notification.builder()
                .content(currentlyLoggedInUser.getUsername() + " has unfollowed " + userToUnfollow.getUsername())
                .subscriber(userToUnfollow)
                .publisher(currentlyLoggedInUser)
                .timestamp(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
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
