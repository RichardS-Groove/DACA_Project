package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.NoteRequestDTO;
import com.grupodaca.dacasystem.dto.response.NoteListResponseDTO;
import com.grupodaca.dacasystem.service.INoteService;
import com.grupodaca.dacasystem.service.NotePDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@Transactional
@RequestMapping("/api")
public class NoteController {
    @Autowired
    INoteService noteService;

    private final NotePDFService notePDFService;

    public NoteController(NotePDFService notePDFService) {
        this.notePDFService = notePDFService;
    }

    @PostMapping("/note")
    public ResponseEntity<SuccessDTO> addNote(@RequestBody NoteRequestDTO dto){
        if(noteService.addNote(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Remito agregado con éxito", 201));
        } else{
            throw new RuntimeException();
        }
    }
    @GetMapping("/note")
    public ResponseEntity<NoteListResponseDTO> findAllInvoice(){
        NoteListResponseDTO noteListResponseDTO = noteService.noteList();
        return ResponseEntity.ok().body(noteListResponseDTO);
    }
    @DeleteMapping("/note/{id}")
    public ResponseEntity<SuccessDTO> deleteInvoice(@PathVariable long id){
        noteService.deleteNote(id);
        return ResponseEntity.ok().body(new SuccessDTO("Remito eliminada con éxito", 201));
    }
    @PutMapping("/note/{id}")
    public ResponseEntity<SuccessDTO> updateNote(@RequestBody NoteRequestDTO dto,@PathVariable long id){
        noteService.updateNote(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Remito modificado con éxito", 201));
    }
    @GetMapping("/note/pdf/{id}")
    public void generatePDF(HttpServletResponse response, @PathVariable long id) throws IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("hh:mm:ss:dd-MM-yyyy");
        String currentDateTime = dateFormat.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment;  filename = pdf_ "+currentDateTime+".pdf";
        response.setHeader(headerKey,headerValue);

        this.notePDFService.export(response,id);
    }

}
