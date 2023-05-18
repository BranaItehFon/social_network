package rs.ac.bg.fon.social_network.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.social_network.domain.Report;
import rs.ac.bg.fon.social_network.service.ReportService;

@RestController
@RequestMapping("/api/v1/reports")
@CrossOrigin
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public Page<Report> getAll(Pageable pageable) {
        return reportService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Report getByID(@PathVariable Long id) {
        return reportService.getById(id);
    }
}