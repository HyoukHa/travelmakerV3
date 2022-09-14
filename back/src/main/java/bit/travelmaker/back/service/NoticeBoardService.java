package bit.travelmaker.back.service;

import bit.travelmaker.back.dto.in.InNotice;
import bit.travelmaker.back.dto.out.OutNotice;
import bit.travelmaker.back.mapper.NoticeBoardMapper;
import bit.travelmaker.back.persistence.BoardRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class NoticeBoardService {
    final NoticeBoardMapper noticeBoardMapper;

    @Autowired
    private BoardRepository boardRepository;

    public List<OutNotice> noticeBoardList(int category){
        return noticeBoardMapper.noticeBoardList(category);
    }
    public List<OutNotice> noticeBoardUpdate(int id){
        return noticeBoardMapper.noticeBoardUpdate(id);
    }

    public List<OutNotice> eventBoardList(int category){
        return noticeBoardMapper.eventBoardList(category);
    }
    public void insert(InNotice inNotice){
        noticeBoardMapper.insert(inNotice);
    }
    public void noticeBoardCount(int id ,int viewCount){
        noticeBoardMapper.noticeBoardCount(id,viewCount);
    }
    public void delete(int id){
        noticeBoardMapper.delete(id);
    }
}