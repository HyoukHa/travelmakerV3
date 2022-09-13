package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.in.InUser;
import bit.travelmaker.back.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/mail")
@Slf4j
public class EmailController {

    @Autowired
    private EmailService emailService;

    /**
     * isDuplicateEmail
     *
     * 작성자 : 권혁하 <mindcypher97@gmail.com>
     * email 중복검사
     */
    @PostMapping(value = "/check/email")
    public ResponseEntity<?> isDuplicateEmail(@RequestBody InUser inUser){
        Boolean exist = emailService.isDuplicateEmail(inUser.getEmail());
        log.error("email: " + inUser.getEmail());
        log.error("exist: " + exist);
        log.error("flag1");

        if(exist) {
            return new ResponseEntity<>(true, HttpStatus.CONFLICT);
        }else {
            String code = sendMail(inUser.getEmail());


            return new ResponseEntity<>(code, HttpStatus.OK);

        }

//        if(exist) {
//            return new ResponseEntity<>(HttpStatus.OK);
//        }else {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
    }

    private String sendMail(String address) {
        SimpleMailMessage message = new SimpleMailMessage();

        /**
         * 랜덤한 6자리 숫자를 만들어주는 부분
         * 1000000을 곱하였을때 앞자리 0들은 int로 인해 변경되므로
         * while문을 통해 6자리를 맞춰준다.
         */
        String randNum = Integer.toString((int)(Math.random()*1000000));

        while (randNum.length() < 6) {
                randNum = "0" + randNum;
                System.out.println(randNum);
        }

        message.setFrom("travelmakers221@gmail.com");
        message.setTo(address);
        message.setSubject("회원가입 이메일 인증 번호");
        message.setText(randNum);
        emailService.sendSimpleMessage(message);
        log.info("success: sending email");

        return randNum;
    }


}