package com.grupodaca.dacasystem.dto.response;

import com.grupodaca.dacasystem.entity.Item;
import com.grupodaca.dacasystem.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteResponseDTO {

    private long id;

    private LocalDate dateOfIssue;

    private String type;

    private String saleCondition;

    private String status;

    private long purchaseOrder;

    private String noteNumber;

    private String invoice;

    private String IVACondition;

    private List<Item> itemsList;

    private long carrier;

    private Project project;
}
