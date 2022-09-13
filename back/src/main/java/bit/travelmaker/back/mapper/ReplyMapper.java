package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.out.Reply;
import bit.travelmaker.back.model.ReplyEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ReplyMapper {
    List<HashMap<String, Object>> findByBoardId(int boardId);
}
