package rs.ac.bg.fon.social_network.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.social_network.domain.Post;
import rs.ac.bg.fon.social_network.domain.Role;
import rs.ac.bg.fon.social_network.domain.User;
import rs.ac.bg.fon.social_network.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    public Page<Post> getAll(Pageable pageable) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        if (currentlyLoggedInUser.getRole().equals(Role.ADMIN))
            return postRepository.findAll(pageable);
        return new PageImpl<>(
                postRepository
                        .findAll(pageable)
                        .stream()
                        .filter(post -> post.getCreator().getFollowers().contains(currentlyLoggedInUser))
                        .toList()
        );
    }

    public Post getById(Long id) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        if (currentlyLoggedInUser.getRole().equals(Role.ADMIN)) {
            return postRepository.findById(id).orElseThrow(NoSuchElementException::new);
        }
        Post post = postRepository.findById(id).orElseThrow(NoSuchElementException::new);
        boolean hasAccess = currentlyLoggedInUser.getFollowing().contains(post.getCreator());
        if (!hasAccess) {
            throw new NoSuchElementException();
        }
        return post;
    }

    public Post savePost(Post post) {
        if(userService.getCurrentlyLoggedInUser().getRole().equals(Role.ADMIN)) {
            throw new IllegalStateException("You must be logged in as regular user to create a post");
        }
        post.setCreator(userService.getCurrentlyLoggedInUser());
        post.setTimePosted(LocalDateTime.now());
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        if(postRepository.existsById(id)) {
            postRepository.deleteById(id);
        }
    }
}
