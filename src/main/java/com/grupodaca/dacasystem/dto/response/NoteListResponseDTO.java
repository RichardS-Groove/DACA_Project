package com.grupodaca.dacasystem.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteListResponseDTO {
    private List<NoteResponseDTO> notes;
}
