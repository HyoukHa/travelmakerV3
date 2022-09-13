package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.out.OutFollow;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FollowMapper {
    List<OutFollow> getFollowerList(int userId);

    List<OutFollow> getFollowingList(int userId);
}
