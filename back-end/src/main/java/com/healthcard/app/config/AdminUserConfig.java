package com.healthcard.app.config;

import com.healthcard.app.entities.Role;
import com.healthcard.app.entities.User;
import com.healthcard.app.entities.enums.GenderEnum;
import com.healthcard.app.repository.RoleRepository;
import com.healthcard.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Set;

@Configuration
public class AdminUserConfig implements CommandLineRunner {

    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public AdminUserConfig(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        var roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name());
        var userAdmin = userRepository.findByEmail("admin@email.com");

        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("Admin already exists");
                },
                () -> {
                    var user = new User();
                    user.setUsername("admin");
                    user.setPassword(passwordEncoder.encode("123"));
                    user.setEmail("admin@email.com");
                    user.setBirthdate(LocalDate.now());
                    user.setRoles(Set.of(roleAdmin));
                    user.setPhone("1");
                    user.setGender(GenderEnum.OTHER);
                    userRepository.save(user);
                }
        );
    }
}
