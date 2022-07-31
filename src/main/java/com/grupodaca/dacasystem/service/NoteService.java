package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.NoteRequestDTO;
import com.grupodaca.dacasystem.dto.response.NoteListResponseDTO;
import com.grupodaca.dacasystem.dto.response.NoteResponseDTO;
import com.grupodaca.dacasystem.entity.Item;
import com.grupodaca.dacasystem.entity.Note;
import com.grupodaca.dacasystem.repository.NoteRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class NoteService implements INoteService {

    @Autowired
    NoteRepository noteRepository;

    ModelMapper mapper = new ModelMapper();

    @Override
    public Long addNote(NoteRequestDTO noteRequestDTO) {

        Note note = mapper.map(noteRequestDTO, Note.class);

        note.setItemsList(noteRequestDTO.getItemsList().stream().map(
                item -> mapper.map(item, Item.class)
        ).collect(Collectors.toList())
        );

        note = noteRepository.save(
                note
        );

        return note.getId();
    }

    @Override
    public NoteListResponseDTO noteList() {

        List<Note> noteList = noteRepository.findAll();

        return new NoteListResponseDTO(
                noteList.stream().map(
                        note -> mapper.map(note, NoteResponseDTO.class)
                ).collect(Collectors.toList())
        );
    }

    @Override
    public void deleteNote(long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public long updateNote(long id, NoteRequestDTO noteRequestDTO) {

        Note note = noteRepository.findNoteById(id);

        note.setDateOfIssue(noteRequestDTO.getDateOfIssue());
        note.setType(noteRequestDTO.getType());
        note.setSaleCondition(noteRequestDTO.getSaleCondition());
        note.setStatus(noteRequestDTO.getStatus());
        note.setPurchaseOrder(noteRequestDTO.getPurchaseOrder());
        note.setItemsList(noteRequestDTO.getItemsList());
        note.setCarrier(noteRequestDTO.getCarrier());
        note.setProject(noteRequestDTO.getProject());

        return noteRequestDTO.getId_note();
    }


}
