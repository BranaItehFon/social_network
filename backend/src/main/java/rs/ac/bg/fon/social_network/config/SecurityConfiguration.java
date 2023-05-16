package rs.ac.bg.fon.social_network.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static rs.ac.bg.fon.social_network.domain.Role.ADMIN;
import static rs.ac.bg.fon.social_network.domain.Role.USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/seed*").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/v1/obavestenja/*").hasAuthority(ADMIN.getAuthority())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/obavestenja/*").hasAuthority(ADMIN.getAuthority())

                        .requestMatchers(HttpMethod.POST, "/api/v1/zahtevi").hasAuthority(USER.getAuthority())
                        .requestMatchers(HttpMethod.POST, "/api/v1/zahtevi/*/razresi").hasAuthority(ADMIN.getAuthority())

                        .anyRequest().authenticated())
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
