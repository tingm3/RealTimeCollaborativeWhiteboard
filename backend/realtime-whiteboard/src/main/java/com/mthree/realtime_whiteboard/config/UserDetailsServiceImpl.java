package com.mthree.realtime_whiteboard.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mthree.realtime_whiteboard.repository.ArtistRepository;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor

public class UserDetailsServiceImpl implements UserDetailsService {

    private final ArtistRepository artistRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return artistRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                "Artist not found with username: " + username));
    }
}
