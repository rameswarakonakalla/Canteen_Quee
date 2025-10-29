package com.canteen.controller;
import com.canteen.entity.MenuItem;
import com.canteen.repository.MenuRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {
    private final MenuRepository menuRepository;
    public MenuController(MenuRepository menuRepository) { this.menuRepository = menuRepository; }

    @GetMapping
    public List<MenuItem> getMenu() { return menuRepository.findAll(); }

    @PostMapping
    public MenuItem addItem(@RequestBody MenuItem item) { return menuRepository.save(item); }
}