package bit.travelmaker.back.service;

import bit.travelmaker.back.dto.out.Reply;
import bit.travelmaker.back.mapper.ReplyMapper;
import bit.travelmaker.back.model.ReplyEntity;
import bit.travelmaker.back.persistence.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private ReplyMapper replyMapper;

    public List<HashMap<String, Object>> getReplyListById(final int boardId) {
        return replyMapper.findByBoardId(boardId);
    }

    public Boolean writeReply(final Reply reply) {

        replyRepository.save(reply.toEntity());

        return true;
    }

    public Boolean deleteReply(final Reply reply){

        ReplyEntity entity = replyRepository.findById(reply.getId()).get();

        replyRepository.delete(entity);

        return true;
    }
}
