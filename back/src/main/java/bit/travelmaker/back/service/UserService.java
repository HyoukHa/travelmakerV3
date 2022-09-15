package bit.travelmaker.back.service;


import bit.travelmaker.back.dto.in.InUser;
import bit.travelmaker.back.mapper.UserMapper;
import bit.travelmaker.back.model.UserEntity;
import bit.travelmaker.back.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    final UserMapper userMapper;

    public PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void signUp(final InUser inUser) {
        inUser.setPassword(passwordEncoder.encode(inUser.getPassword()));
        inUser.setDisabled(false);
        UserEntity userEntity = inUser.toEntity();

        userRepository.save(userEntity);
    }

    public Boolean isDuplicateUsername(final String username) {
        return userRepository.existsByUsername(username);
    }

    public Boolean isDuplicateNickname(final String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public Boolean isDuplicateNicknameInUpdate(final int id, final String nickname) {
        UserEntity user = userRepository.findById(id).get();

        Boolean exist = userRepository.existsByNickname(nickname);

        if (exist && nickname.equals(user.getNickname())) {
            exist = false;
            System.out.println("exist : ?? : " + exist);
        }

        return exist;
    }

    public UserEntity findByUsername(final String username) {
        return userRepository.findByUsername(username);
    }

    public InUser signIn(final String username, final String password) {
        final UserEntity originalUser = userRepository.findByUsername(username);

        if(originalUser != null && passwordEncoder.matches(password, originalUser.getPassword()) && originalUser.getDisabled() == false) {
            return InUser.builder()
                    .id(originalUser.getId())
                    .nickname(originalUser.getNickname())
                    .src_photo(originalUser.getSrc_photo())
                    .rank(originalUser.getRank())
                    .build();
        }

        return null;
    }

    public void update(final int id, final InUser inUser) {
        InUser user = userRepository.findById(id).get().makeDataToUpdate();

        user.setGender(inUser.getGender());
        user.setNickname(inUser.getNickname());


        if(inUser.getCompany_num() != null) {
            user.setCompany_num(inUser.getCompany_num());
        }

        if(inUser.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(inUser.getPassword()));
        }

        if(inUser.getSrc_photo() != null) {
            user.setSrc_photo(inUser.getSrc_photo());
        }

        System.out.println(user);

        userRepository.save(user.toEntity());
    }


    public void disabled(int id) {
        userMapper.disabled(id);
    }

    public InUser whoAmI(int id) {
        UserEntity userEntity = userRepository.findById(id).get();

        InUser user = userEntity.makeData();

        return user;
    }

    public List<HashMap<String, Object>> getUserList() {
        List<HashMap<String, Object>> response = userMapper.getUserList();

        return response;
    }

    public Boolean updateRank(final List<HashMap<String, Object>> request) {

        for(HashMap<String, Object> req : request) {
            try{
                userMapper.updateRank(req);
                System.out.println("success");
            }catch(Exception e) {
                System.out.println(e);
            }
        }

        return null;
    }

    public InUser passwordCheck(final int id,final String password){
        InUser user = null;

        UserEntity userEntity = userRepository.findById(id).get();

        System.out.println("flag3: " + userEntity);

        Boolean match = passwordEncoder.matches(password, userEntity.getPassword());

        System.out.println("flag4: " + match);
        if(match) {
            user = userEntity.makeData();
        }
        System.out.println("flag5: " + user);

        return user;
    };
}
