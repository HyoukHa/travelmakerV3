package bit.travelmaker.back.persistence;

import bit.travelmaker.back.dto.out.Reply;
import bit.travelmaker.back.model.ReplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Integer> {

}
