package bit.travelmaker.back.controller;

import bit.travelmaker.back.dto.out.Reply;
import bit.travelmaker.back.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/api/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @GetMapping(value = "/{boardId}")
    public ResponseEntity<?> getReplyListById(@PathVariable int boardId) {
        HttpStatus status = HttpStatus.OK;

        List<HashMap<String, Object>> response = replyService.getReplyListById(boardId);

        return new ResponseEntity<>(response, status);
    }

    @PostMapping(value = "/write")
    public ResponseEntity<?> writeReply(@AuthenticationPrincipal int userId, @RequestBody Reply reply){
        HttpStatus status = HttpStatus.OK;

        reply.setUserId(userId);

        replyService.writeReply(reply);

        return new ResponseEntity<>(status);
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<?> deleteReply(@RequestBody Reply reply) {
        HttpStatus status = HttpStatus.OK;

        replyService.deleteReply(reply);

        return new ResponseEntity<>(status);
    }
}
