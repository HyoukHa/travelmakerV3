package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.in.InUser;
import bit.travelmaker.back.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {
    void save(InUser user);

    void disabled(int id);

    List<HashMap<String, Object>> getUserList();

    void updateRank(HashMap<String, Object> request);

}
