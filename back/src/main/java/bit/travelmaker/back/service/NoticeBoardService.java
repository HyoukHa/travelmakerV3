package bit.travelmaker.back.service;

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

    public List<OutNotice> NoticeBoardList(int category){
        return noticeBoardMapper.NoticeBoardList(category);
    }
    public List<OutNotice> NoticeBoardUpdate(int id){
        return noticeBoardMapper.NoticeBoardUpdate(id);
    }

    public List<OutNotice> EventBoardList(int category){
        return noticeBoardMapper.EventBoardList(category);
    }
}