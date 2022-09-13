package bit.travelmaker.back.service;

import bit.travelmaker.back.dto.common.Follow;
import bit.travelmaker.back.dto.out.OutFollow;
import bit.travelmaker.back.mapper.FollowMapper;
import bit.travelmaker.back.model.FollowEntity;
import bit.travelmaker.back.persistence.FollowRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FollowService {
    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private FollowMapper followMapper;

    public List<OutFollow> getFollower(final int userId) {
        List<OutFollow> response = followMapper.getFollowerList(userId);
        System.out.println(userId);
        System.out.println("followService list : " + response);
        if(response != null){
            return response;
        }else {
            return null;
        }
    }

    public List<OutFollow> getFollowing(final int userId) {
        List<OutFollow> response = followMapper.getFollowingList(userId);
        if(response != null){
            return response;
        }else {
            return null;
        }

    }

    public Boolean follow(final Follow follow) {
        System.out.println("flag1123: ");
        FollowEntity followEntity = null;
        if(followRepository.existsByLikeUserIdAndLikedUserId(follow.getLikeUserId(), follow.getLikedUserId())) {
            followEntity = followRepository.findByLikeUserIdAndLikedUserId(follow.getLikeUserId(), follow.getLikedUserId()).get();
        }

        System.out.println("flag1123: " + followEntity);
        Boolean success = true;

        FollowEntity insertData = follow.convertToEntity();

        if(followEntity == null) {
            followRepository.save(insertData);
        }else {
            success = false;
            followRepository.delete(followEntity);

        }

        return success;
    }
}
