package com.mthree.realtime_whiteboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mthree.realtime_whiteboard.model.Artist;
import com.mthree.realtime_whiteboard.repository.ArtistRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/artists")
@CrossOrigin(origins = "http://localhost:4200")
public class ArtistController {

    @Autowired
    private ArtistRepository artistRepository;

    // Get all artists
    @GetMapping
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    // Get artist by ID
    @GetMapping("/{id}")
    public Optional<Artist> getArtistById(@PathVariable Long id) {
        return artistRepository.findById(id);
    }

    // Get artist by username
    @GetMapping("/by-username/{username}")
    public Optional<Artist> getArtistByUsername(@PathVariable String username) {
        return artistRepository.findByUsername(username);
    }

    // Create new artist
    @PostMapping
    public Artist createArtist(@RequestBody Artist artist) {
        return artistRepository.save(artist);
    }

    // Delete artist by ID
    @DeleteMapping("/{id}")
    public void deleteArtist(@PathVariable Long id) {
        artistRepository.deleteById(id);
    }
}
