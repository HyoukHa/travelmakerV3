package bit.travelmaker.back.service;

import bit.travelmaker.back.persistence.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender emailSender;

    @Autowired
    private UserRepository userRepository;

    public Boolean isDuplicateEmail(String email) {
        if(userRepository.existsByEmail(email)) {
            log.error("exist email");
            return true;
        }else {
            log.info("no email in db");
            return false;
        }
    }
    public void sendSimpleMessage(SimpleMailMessage message) {

        emailSender.send(message);
    }
}