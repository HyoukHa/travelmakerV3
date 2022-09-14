package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.in.InNotice;
import bit.travelmaker.back.dto.out.OutNotice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeBoardMapper {
    List<OutNotice> noticeBoardList(int category);
    List<OutNotice> noticeBoardUpdate(int id);
    List<OutNotice> eventBoardList(int category);
    void insert(InNotice inNotice);
    void noticeBoardCount(int id, int viewCount);

    void delete(int id);

}