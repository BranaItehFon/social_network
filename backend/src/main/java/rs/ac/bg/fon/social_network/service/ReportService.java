package rs.ac.bg.fon.social_network.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.social_network.domain.Report;
import rs.ac.bg.fon.social_network.domain.Role;
import rs.ac.bg.fon.social_network.domain.User;
import rs.ac.bg.fon.social_network.repository.ReportRepository;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserService userService;

    public Page<Report> getAll(Pageable pageable) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        if(!currentlyLoggedInUser.getRole().equals(Role.ADMIN))
            throw new AccessDeniedException("Only admin can access reports");
        return reportRepository.findAll(pageable);
    }

    public Report getById(Long id) {
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        if(!currentlyLoggedInUser.getRole().equals(Role.ADMIN))
            throw new AccessDeniedException("Only admin can access reports");
        return reportRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }
}
