package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.response.*;
import com.grupodaca.dacasystem.repository.IncomingBillRepository;
import com.grupodaca.dacasystem.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    IncomingBillRepository incomingBillRepository;

    @Autowired
    InvoiceRepository invoiceRepository;


    public MonthyAmountResponseDTO getBillingByMonth(Integer month, Integer year) {
        Double monthyEarnings = invoiceRepository.obtainMonthlyBenefits(month,year);
        if(monthyEarnings==null){monthyEarnings=0D;}
        return new MonthyAmountResponseDTO(month,year,monthyEarnings);
    }

    public YearAmountResponseDTO getBillingByYear(Integer year) {
        Double annualEarnings = invoiceRepository.obtainAnnualBenefits(year);
        if(annualEarnings==null){annualEarnings=0D;}
        return new YearAmountResponseDTO(year,annualEarnings);
    }

    public IvaSalesResponseDTO getIVASalesByMonth(Integer month, Integer year) {
        Double monthlyIVASales = invoiceRepository.obtainMonthlyIVA(month,year);
        if(monthlyIVASales==null){monthlyIVASales=0D;}
        return new IvaSalesResponseDTO(month,year,monthlyIVASales);
    }

    public AnnualIvaSalesResponseDTO getIVASalesByYear(Integer year) {
        Double annualIVASales = invoiceRepository.obtainAnnualIVA(year);
        if(annualIVASales==null){annualIVASales=0D;}
        return new AnnualIvaSalesResponseDTO(year,annualIVASales);
    }

    public MonthyAmountResponseDTO getExpensesByMonth(Integer month, Integer year) {
        Double monthyExpenses = incomingBillRepository.obtainMonthlyExpenses(month,year);
        if(monthyExpenses==null){monthyExpenses=0D;}
        return new MonthyAmountResponseDTO(month,year,monthyExpenses);
    }

    public YearAmountResponseDTO getExpensesByYear(Integer year) {
        Double annualEarnings = incomingBillRepository.obtainAnnualExpenses(year);
        if(annualEarnings==null){annualEarnings=0D;}
        return new YearAmountResponseDTO(year,annualEarnings);
    }
    public IvaPurchaseResponseDTO getIVAPurchaseByMonth(Integer month, Integer year) {
        Double monthyIVA = incomingBillRepository.obtainMonthlyIVA(month,year);
        if(monthyIVA==null){monthyIVA=0D;}
        return new IvaPurchaseResponseDTO(month,year,monthyIVA);
    }

    public AnnualIvaPurchaseResponseDTO getIVAPurchaseByYear(Integer year) {
        Double annualIVA = incomingBillRepository.obtainAnnualIVA(year);
        if(annualIVA==null){annualIVA=0D;}
        return new AnnualIvaPurchaseResponseDTO(year,annualIVA);
    }

    public MonthlyResumeResponseListDTO getResumeByMonth(Integer month, Integer year) {

        MonthlyResumeResponseListDTO monthlyResumeResponseListDTO = new MonthlyResumeResponseListDTO();
        List<MonthlyResumeResponseDTO> monthlyResumeResponseDTOS = new ArrayList<>();

        int verif;
        if(month<=12){
            verif = month;
        }
        else {
            verif = 12;
        }
        for (int i = 0; i < verif; i++) {
            Double monthyEarnings = invoiceRepository.obtainMonthlyBenefits(month-i,year);
            Double monthyExpenses = incomingBillRepository.obtainMonthlyExpenses(month-i,year);
            if(monthyExpenses==null){monthyExpenses=0D;}
            if(monthyEarnings==null){monthyEarnings=0D;}
            double totalEarnings = monthyEarnings - monthyExpenses;
            Double monthyIVA = incomingBillRepository.obtainMonthlyIVA(month-i,year);
            if(monthyIVA==null){monthyIVA=0D;}
            Double monthlyIVASales = invoiceRepository.obtainMonthlyIVA(month-i,year);
            if(monthlyIVASales==null){monthlyIVASales=0D;}
            double monthlyIVAAverage = monthlyIVASales - monthyIVA;
            MonthlyResumeResponseDTO monthlyResumeResponseDTO = new MonthlyResumeResponseDTO(month-i,year,monthyEarnings,monthyExpenses,totalEarnings,monthyIVA,monthlyIVASales,monthlyIVAAverage);
            monthlyResumeResponseDTOS.add(monthlyResumeResponseDTO);
        }

        monthlyResumeResponseListDTO.setMonthlyResumeResponseDTOList(monthlyResumeResponseDTOS);
        return monthlyResumeResponseListDTO;
    }
}
