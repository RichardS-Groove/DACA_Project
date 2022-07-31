package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.IncomingBillRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.IncomingBillListResponseDTO;

public interface IIncomingBillService {

    Long addIncomingBill(IncomingBillRequestDTO incomingBillRequestDTO);

    IncomingBillListResponseDTO incomingBillList();

    void deleteIncomingBill(long id);

    long updateIncomingBill(long id, IncomingBillRequestDTO incomingBillRequestDTO);
}
