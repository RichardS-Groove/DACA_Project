package com.grupodaca.dacasystem.dto.request;

import com.grupodaca.dacasystem.entity.Item;
import com.grupodaca.dacasystem.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteRequestDTO {

    private long id_note;

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
