package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.out.OutNotice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeBoardMapper {
    List<OutNotice> NoticeBoardList(int category);
    List<OutNotice> NoticeBoardUpdate(int id);
    List<OutNotice> EventBoardList(int category);

}