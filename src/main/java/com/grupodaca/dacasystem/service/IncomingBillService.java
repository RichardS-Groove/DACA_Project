package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.IncomingBillRequestDTO;
import com.grupodaca.dacasystem.dto.response.IncomingBillListResponseDTO;
import com.grupodaca.dacasystem.dto.response.IncomingBillResponseDTO;
import com.grupodaca.dacasystem.dto.response.InvoiceListResponseDTO;
import com.grupodaca.dacasystem.dto.response.InvoiceResponseDTO;
import com.grupodaca.dacasystem.entity.IncomingBill;
import com.grupodaca.dacasystem.entity.Invoice;
import com.grupodaca.dacasystem.repository.IncomingBillRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncomingBillService implements IIncomingBillService{

    @Autowired
    IncomingBillRepository incomingBillRepository;

    ModelMapper mapper = new ModelMapper();

    @Override
    public Long addIncomingBill(IncomingBillRequestDTO incomingBillRequestDTO) {
        IncomingBill incomingBill = mapper.map(incomingBillRequestDTO, IncomingBill.class);

        incomingBill = incomingBillRepository.save(
                incomingBill
        );

        return incomingBill.getId();
    }

    @Override
    public IncomingBillListResponseDTO incomingBillList() {
        List<IncomingBill> incomingBillList = incomingBillRepository.findAll();

        return new IncomingBillListResponseDTO(
                incomingBillList.stream().map(
                        incomingBill -> mapper.map(incomingBill, IncomingBillResponseDTO.class)
                ).collect(Collectors.toList())
        );
    }

    @Override
    public void deleteIncomingBill(long id) {
        incomingBillRepository.deleteById(id);
    }

    @Override
    public long updateIncomingBill(long id, IncomingBillRequestDTO incomingBillRequestDTO) {

        IncomingBill incomingBill = incomingBillRepository.findIncomingBillById(id);

        incomingBill.setInvoiceNumber(incomingBillRequestDTO.getInvoiceNumber());
        incomingBill.setDateOfIssue(incomingBillRequestDTO.getDateOfIssue());
        incomingBill.setType(incomingBillRequestDTO.getType());
        incomingBill.setSupplier(incomingBillRequestDTO.getSupplier());
        incomingBill.setSaleCondition(incomingBillRequestDTO.getSaleCondition());
        incomingBill.setStatus(incomingBillRequestDTO.getStatus());
        incomingBill.setPurchaseOrder(incomingBillRequestDTO.getPurchaseOrder());
        incomingBill.setInvoiceAmount(incomingBillRequestDTO.getInvoiceAmount());
        incomingBill.setIva(incomingBillRequestDTO.getIva());

        return incomingBillRequestDTO.getId();
    }
}
