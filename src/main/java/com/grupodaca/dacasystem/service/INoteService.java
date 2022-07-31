package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.NoteRequestDTO;
import com.grupodaca.dacasystem.dto.response.NoteListResponseDTO;

import java.util.List;

public interface INoteService {
    Long addNote(NoteRequestDTO noteRequest);

    NoteListResponseDTO noteList();

    void deleteNote(long id);

    long updateNote(long id, NoteRequestDTO noteRequestDTO);

}
